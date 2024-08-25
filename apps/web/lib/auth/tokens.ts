"use server";
import { prisma } from "db/prisma";

export async function clearExpiredTokens () {

  try {
    await prisma.verificationToken.deleteMany({
      where: { expires: { lt: new Date(Date.now()) } }
    });
  }
  catch(err) {
    console.log(err);
  }
}