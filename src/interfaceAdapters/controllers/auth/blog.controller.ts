import type { NextFunction, Request, Response } from "express";
import type { IBlogController } from "../../../entities/controllerInterfaces/blog-controller.interface";
import { HttpStatusCode } from "../../../shared/constants/constants";
import type { BlogSection } from "../../../entities/models/blog.entity";
import type { ICreateBlogUsecase } from "../../../entities/usecaseInterfaces/blog/create_blog.usecase.interface";

export class BlogController implements IBlogController {
  constructor(
    private _createBlogUsecase: ICreateBlogUsecase,
  ) {}

  async createBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      const body = req.body;
        console.log(files, body)
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
        console.log("create blog error: ",err);
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
          sections[index].image = file.filename;
        } else if (file.fieldname === "coverImage") {
          blog.image = file.filename;
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
      console.log(newBlog)
      res.status(HttpStatusCode.CREATED).json({ blog: newBlog });
    } catch (error) {
      next(error);
    }
  }
}
