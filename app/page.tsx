"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error } = useSWR("/api/joker", fetcher);

  console.log(data);

  // if (error) return <div>Failed to load</div>;
  // if (isLoading) return <div>Loading...</div>;

  return <div>1</div>;
}
