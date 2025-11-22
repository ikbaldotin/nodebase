import { LoginForm } from "@/app/features/auth/components/login-forms";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();
  return <LoginForm />;
};

export default Page;
