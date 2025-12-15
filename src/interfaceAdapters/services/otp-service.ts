import type { IOtpService } from "../../entities/services/otp-service.interface.js";

export class OtpSerivce implements IOtpService {
  constructor() {}

  generateOTP(): string {
    return Math.floor(Math.random() * 900000 + 100000).toString();
  }
}
