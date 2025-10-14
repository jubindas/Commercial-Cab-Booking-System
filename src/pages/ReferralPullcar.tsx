import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getSalesmanReferralPullcar } from "@/service/apiSalesman";

import { useAuth } from "@/hooks/useAuth";

export default function ReferralPullcar() {
  const { id } = useParams();
  const { token } = useAuth();

  const { data: referralPullcar } = useQuery({
    queryKey: ["salesmanReferral", id],
    queryFn: () => getSalesmanReferralPullcar(id, token),
    enabled: !!id && !!token,
  });

  console.log("the pulll car are ", referralPullcar);

  return <div>ReferralPullcar</div>;
}
