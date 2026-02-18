import { redirect } from "next/navigation";
import ProfileForm from "./_components/ProfileForm";

export default function ProfilePage() {
  redirect("/user/profile/client");
}