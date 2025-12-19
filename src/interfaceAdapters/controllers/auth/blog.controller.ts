import type { NextFunction, Request, Response } from "express";
import type { IBlogController } from "../../../entities/controllerInterfaces/blog-controller.interface";
import { HttpStatusCode } from "../../../shared/constants/constants";
import type { BlogSection } from "../../../entities/models/blog.entity";
import type { ICreateBlogUsecase } from "../../../entities/usecaseInterfaces/blog/create_blog.usecase.interface";
import type { IGetBlogUsecase } from "../../../entities/usecaseInterfaces/blog/get_blog.usecase.interface";
import type { IEditBlogUsecase } from "../../../entities/usecaseInterfaces/blog/edit_blog.usecase.interface";
import {
  calculateTotalPages,
  getPaginationParams,
} from "../../../shared/utils/pagination.helpers";
import type { IGetHomeDataUsecase } from "../../../entities/usecaseInterfaces/blog/get_home-data.usecase.interface";
import type { IDeleteBlogUsecase } from "../../../entities/usecaseInterfaces/blog/delete_blog.usecase.interface";

export class BlogController implements IBlogController {
  constructor(
    private _createBlogUsecase: ICreateBlogUsecase,

    private _getBlogUsecase: IGetBlogUsecase,

    private _editBlogUsecase: IEditBlogUsecase,

    private _getHomeDataUsecase: IGetHomeDataUsecase,

    private _deleteBlogUsecase: IDeleteBlogUsecase,
  ) {}

  async createBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      const body = req.body;
      console.log(files, body);
      const sections: {
        sectionTitle?: string;
        content?: string;
        image?: string;
      }[] = [];

      // Step 1: Base blog object
      const blog = {
        userId: body.userId,
        title: body.title,
        author: body.author,
        introduction: body.introduction,
        image: "",
        sections: [],
      };

      let parsedSections: BlogSection[] = [];

      try {
        parsedSections = JSON.parse(body.sections);
      } catch (err) {
        console.log("create blog error: ", err);
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Invalid sections JSON" });
        return;
      }

      // Step 3: Attach section images and cover image
      files.forEach((file) => {
        if (file.fieldname.startsWith("section-image-")) {
          const index = parseInt(
            file.fieldname.split("section-image-")[1] as string
          );
          if (!sections[index]) sections[index] = {};
          sections[index].image = file.path;
        } else if (file.fieldname === "coverImage") {
          blog.image = file.path;
        }
      });

      // Step 4: Merge parsedSections (title/content) with images
      parsedSections.forEach((section, index) => {
        if (!sections[index]) sections[index] = {};
        sections[index].sectionTitle = section.sectionTitle;
        sections[index].content = section.content;
      });

      // Step 5: Assign final sections to blog
      (blog.sections as object) = sections;

      const newBlog = await this._createBlogUsecase.execute(blog);
      console.log(newBlog);
      res.status(HttpStatusCode.CREATED).json({ blog: newBlog });
    } catch (error) {
      next(error);
    }
  }

  async getBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { blogId } = req.params;
      console.log(blogId);
      const blog = await this._getBlogUsecase.execute(blogId as string);
      console.log(blog);
      res.status(HttpStatusCode.OK).json({ blog });
    } catch (error) {
      next(error);
    }
  }

  async editBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const blogId = req.params.blogId;
      const body = req.body;
      const files = req.files as Express.Multer.File[];
      console.log(blogId);
      type Sections = {
        sectionTitle?: string;
        content?: string;
        image: string;
      };

      // Parse the sections from string to array
      let parsedSections: Sections[] = [];
      if (body.sections) {
        try {
          parsedSections = JSON.parse(body.sections);
        } catch (err) {
          console.error("Failed to parse sections:", err);
          res.status(400).json({ message: "Invalid sections format" });
          return;
        }
      }
      // console.log("parsedSections in editblog: ",parsedSections)
      // Handle image uploads
      if (files && files.length) {
        files.forEach((file) => {
          console.log(file);
          if (file.fieldname === "coverImage") {
            body.image = file.path;
          } else {
            // This is a section image
            const sectionIndex = parseInt(file.fieldname.slice(-1));
            console.log(
              "loiwoigj  ",
              parsedSections[sectionIndex],
              sectionIndex
            );
            if (parsedSections[sectionIndex]) {
              parsedSections[sectionIndex].image = file.path;
            }
          }
        });
      }
      // console.log("parsedsections after file attached: ", parsedSections)
      // Replace sections with the updated array
      body.sections = parsedSections;
      console.log("body after attachments: ", body);
      const blog = await this._editBlogUsecase.execute(blogId as string, body);

      res.status(HttpStatusCode.OK).json({ blog });
    } catch (error) {
      next(error);
    }
  }

  async getHomeData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { search } = req.query;
      const { limit, skip } = getPaginationParams(req);

      const filter: Record<string, unknown> = {
        isBlocked: false,
      };

      if (typeof search === "string" && search.trim()) {
        filter.title = {
          $regex: search.trim(),
          $options: "i", // case-insensitive
        };
      }

      const result = await this._getHomeDataUsecase.execute(
        limit,
        skip,
        filter
      );

      result.total = calculateTotalPages(result.total, limit);

      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { blogId } = req.params;
      console.log(blogId, "blog delete controller")
      await this._deleteBlogUsecase.execute(blogId as string);

      res.status(HttpStatusCode.OK).json({message: "Blog deleted successfully"})
    } catch (error) {
      next(error)
    }
  }
}
