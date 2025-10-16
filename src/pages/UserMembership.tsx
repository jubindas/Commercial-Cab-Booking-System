import { useAuth } from "@/hooks/useAuth";
import { getUserMembership } from "@/service/apiUserMembership";
import { useQuery } from "@tanstack/react-query";

export default function UserMembership() {
  const { token } = useAuth();

  const { data } = useQuery({
    queryKey: ["user-membership"],
    queryFn: () => getUserMembership(token),
  });

  console.log("the membership data is", data);

  return <div>UserMembership</div>;
}
