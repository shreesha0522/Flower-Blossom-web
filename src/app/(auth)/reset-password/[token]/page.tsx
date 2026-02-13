import ResetPasswordForm from "../../_components/ResetPasswordForm";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div>
      <p className="text-center m-0 text-3xl">Reset Password</p>
      <ResetPasswordForm token={token} />
    </div>
  );
}