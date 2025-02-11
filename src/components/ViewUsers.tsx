"use client"

import { getUsers } from "@/server-actions/userService"
import { useEffect, useState } from "react"
import type { userSelectType } from "@/app/db/schema/userSchema"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/activeUserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Check, X } from "lucide-react"

export function ViewUsers() {
  const [users, setUsers] = useState<userSelectType[] | null>(null)
  const [loading, setLoading] = useState(true)
  const { state, dispatch } = useUser()

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const userData = await getUsers()
      if (userData) {
        setUsers(userData)
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const setAsActiveUser = (user: userSelectType) => {
    dispatch({ type: "SET_AS_ACTIVE", payload: user })
  }

  if (loading) {
    return <UserTableSkeleton />
  }

  if (!users || users.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">No users found</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg?height=40&width=40"}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell className="text-center">{user.age || "N/A"}</TableCell>
                  <TableCell>
                    <StatusBadge active={user.account_status} />
                  </TableCell>
                  <TableCell>{user.role || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={user.id === state.id ? "secondary" : "default"}
                      size="sm"
                      onClick={() => setAsActiveUser(user)}
                    >
                      {user.id === state.id ? "Active" : "Set Active"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge variant={active ? "default" : "destructive"} className="w-24 justify-center">
      {active ? (
        <>
          <Check className="mr-1 h-3 w-3" />
          Active
        </>
      ) : (
        <>
          <X className="mr-1 h-3 w-3" />
          Inactive
        </>
      )}
    </Badge>
  )
}

function UserTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[200px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

