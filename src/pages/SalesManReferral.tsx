import { useParams } from "react-router-dom";

import { getSalesmanReferral } from "@/service/apiSalesman";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/hooks/useAuth";

export default function SalesManReferral() {
  const { id } = useParams();
  const { token } = useAuth();

  const { data } = useQuery({
    queryKey: ["salesman"],
    queryFn: () => getSalesmanReferral(id, token),
  });

  console.log("the refferal is", data);

  return <div>{data}</div>;
}
