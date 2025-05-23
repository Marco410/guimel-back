import { KeystoneContext } from "@keystone-6/core/types";
export async function createUserAdmin(
  context: KeystoneContext,
  roles: readonly Record<string, any>[]
) {
  const existingUser = await context.sudo().query.User.findMany({
    query: "id",
  });
  if (existingUser.length > 0) {
    console.log("♻️  Skipped User seeding.");
    return existingUser[0].id;
  }

  const data = await context.sudo().query.User.createOne({
    data: {
      name: "Marco",
      lastName: "Castañeda",
      email: "marco_pascual410@hotmail.com",
      password: "1234567890",
      phone: "4434012693",
      role: { connect: { id: roles[0].id } },
    },
    query: "id",
  });
  console.log("✅ User seeding complete.");

  return data.id;
}
