import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // Vérification si l'utilisateur existe déjà
    const existingUser = await prisma.admin.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "Un utilisateur avec cet email ou ce nom d'utilisateur existe déjà",
        },
        { status: 400 }
      );
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'administrateur
    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // On ne renvoie pas le mot de passe
    const { password: _, ...adminWithoutPassword } = admin;

    return NextResponse.json(
      {
        message: "Administrateur créé avec succès",
        admin: adminWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de l'enregistrement de l'administrateur:",
      error
    );
    return NextResponse.json(
      { message: "Erreur lors de la création de l'administrateur" },
      { status: 500 }
    );
  }
}
