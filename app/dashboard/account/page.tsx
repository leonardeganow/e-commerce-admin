"use client";

import { PasswordForm } from "@/components/accounts/password-form";
import { StoreForm } from "@/components/accounts/store-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-2xl mx-auto">
          <Tabs defaultValue="store" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="store">Store Details</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
            </TabsList>
            <TabsContent value="store">
              <CardContent className="mt-6">
                <StoreForm />
              </CardContent>
            </TabsContent>
            <TabsContent value="password">
              <CardContent className="mt-6">
                <PasswordForm />
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
