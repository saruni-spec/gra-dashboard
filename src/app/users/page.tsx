import { getUsers } from "@/lib/api";
import { UserTable } from "@/components/users/UserTable";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Taxpayer Management</h2>
      </div>
      <div className="space-y-4">
        <UserTable users={users} />
      </div>
    </div>
  );
}
