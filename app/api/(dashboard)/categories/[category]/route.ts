import connect from "@/lib/db";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import UserModal, { User } from "@/lib/modals/user.modal";
import CategoryModal, { Category } from "@/lib/modals/category.modal";

export const PATCH = async (request: Request, context: { params: any }) => {
  const categoryId: string = context.params.category;
  try {
    const body: { title: string } = await request.json();
    const { title } = body;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing categoryId" }),
        { status: 400 }
      );
    }

    await connect();

    const user: User | null = await UserModal.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const category: Category | null = await CategoryModal.findOne({
      _id: categoryId,
      user: userId,
    });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    const updatedCategory: Category | null =
      await CategoryModal.findByIdAndUpdate(
        categoryId,
        { title },
        { new: true }
      );

    return new NextResponse(
      JSON.stringify({
        message: "Category is updated",
        category: updatedCategory,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating category" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  const categoryId: string = context.params.category;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing categoryId" }),
        { status: 400 }
      );
    }

    await connect();

    const user: User | null = await UserModal.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const category: Category | null = await CategoryModal.findOne({
      _id: categoryId,
      user: userId,
    });
    if (!category) {
      return new NextResponse(
        JSON.stringify({
          message: "Category not found or does not belong to the user",
        }),
        {
          status: 404,
        }
      );
    }

    await CategoryModal.findByIdAndDelete(categoryId);

    return new NextResponse(
      JSON.stringify({ message: "Category is deleted" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting category" + error.message, {
      status: 500,
    });
  }
};
