import { RegisterForm } from "@/app/features/auth/components/register-forms";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();
  return <RegisterForm />;
};

export default Page;
