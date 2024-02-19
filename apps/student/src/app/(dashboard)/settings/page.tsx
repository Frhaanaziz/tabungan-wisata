import { checkSessionAction } from "@/app/_actions";
import CreatePasswordForm from "@/components/forms/CreatePasswordForm";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import { Separator } from "@ui/components/shadcn/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui/components/shadcn/tabs";

const SettingsPage = async () => {
  const user = (await checkSessionAction()).data;

  return (
    <div className="container min-h-[calc(100vh-105px-112px)]">
      <h1 className="mb-8 text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="account" className="">
        <TabsList className="mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-sm text-muted-foreground">
            Update your photo and personal details here
          </p>

          <Separator className="my-5" />

          <UpdateProfileForm user={user} />
        </TabsContent>
        <TabsContent value="password">
          {user.password ? (
            <>
              <h2 className="text-xl font-semibold">Change Password</h2>
              <p className="text-sm text-muted-foreground">
                To change your password, please fill in the fields bellow.
                <br />
                Your password must contain at least 6 characters, it must also
                include at least one uppercase letter, one lowercase letter, one
                number and one special character.
              </p>

              <Separator className="my-5" />

              <UpdatePasswordForm />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">Create Password</h2>
              <p className="text-sm text-muted-foreground">
                You have not set a password for your account yet. Please set a
                password to secure your account.
                <br />
                Your password must contain at least 6 characters, it must also
                include at least one uppercase letter, one lowercase letter, one
                number and one special character.
              </p>

              <Separator className="my-5" />

              <CreatePasswordForm />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
