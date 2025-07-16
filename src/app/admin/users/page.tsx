import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import type { DisplayUser } from "@/lib/types";

const users: DisplayUser[] = [
  { id: "usr_1", name: "Ahmad Wali", email: "ahmad@example.com", balance: "1.2M", status: "Active", joined: "2023-01-15" },
  { id: "usr_2", name: "Fatima Noori", email: "fatima@example.com", balance: "850K", status: "Active", joined: "2023-02-20" },
  { id: "usr_3", name: "Yusuf Ahmadi", email: "yusuf@example.com", balance: "120K", status: "Suspended", joined: "2023-03-10" },
  { id: "usr_4", name: "Zainab Popal", email: "zainab@example.com", balance: "5.6M", status: "Active", joined: "2023-04-05" },
  { id: "usr_5", name: "Omar Zakhilwal", email: "omar@example.com", balance: "320K", status: "Banned", joined: "2023-05-21" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">View, manage, and monitor all user accounts.</p>
      </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>A list of all users in the EduAfghanX ecosystem.</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Input placeholder="Search users..." className="w-full sm:w-64" />
                    <Button>Search</Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
           <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Balance (Points)</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={`https://placehold.co/40x40.png`} alt={user.name} data-ai-hint="avatar user"/>
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>{user.status}</Badge>
                                </TableCell>
                                <TableCell className="font-mono">{user.balance}</TableCell>
                                <TableCell>{user.joined}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
