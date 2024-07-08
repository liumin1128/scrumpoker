"use client";

import { useRouter } from "next/navigation";

const apiPath = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const router = useRouter();

  const handleSubmit = async () => {
    const roomValue = (document?.getElementById("room") as HTMLInputElement)
      ?.value;

    const usernameValue = (
      document?.getElementById("username") as HTMLInputElement
    )?.value;

    if (roomValue === "" || usernameValue === "") {
      return;
    }

    const response = await fetch(apiPath + "/scrumpoker/joinroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomID: roomValue,
        username: usernameValue,
        // iAmScrumMaster: true,
      }),
    });

    const data = await response.json();
    console.log("data");
    console.log(data);

    router.push("/room/" + roomValue + "/" + usernameValue);
  };

  console.log(apiPath);
  console.log(apiPath);
  return (
    <div>
      <section className="text-gray-600 body-font relative ">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Scrum Poker
            </h1>
          </div>

          <div className="mx-auto max-w-[348px]">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Room
                  </label>
                  <input
                    type="text"
                    id="room"
                    name="room"
                    className="w-full bg-slate-900 bg-opacity-50 rounded border border-gray-900 focus:border-indigo-500 focus:bg-slate-700 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="username"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    id="username"
                    name="username"
                    className="w-full bg-slate-900 bg-opacity-50 rounded border border-gray-900 focus:border-indigo-500 focus:bg-slate-700 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 mt-4 w-full">
                <button
                  onClick={handleSubmit}
                  className="w-full text-center mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
