"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleJoinRoom = async () => {
    const roomID = "123456";
    const username = "liumin";
    const response = await fetch("http://localhost:3111/scrumpoker/joinroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomID: roomID,
        username: username,
        // iAmScrumMaster: true,
      }),
    });

    const data = await response.json();
    console.log("data");
    console.log(data);

    router.push("/room/" + roomID + "/" + username);
  };

  const handleJoinRoom2 = async () => {
    const roomID = "123456";
    const username = "sss";

    const response = await fetch("http://localhost:3111/scrumpoker/joinroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomID: roomID,
        username: username,
      }),
    });

    const data = await response.json();
    console.log("data");
    console.log(data);

    router.push("/room/" + roomID + "/" + username);
  };

  const handleSubmit = async () => {
    const roomValue = (document?.getElementById("room") as HTMLInputElement)
      ?.value;
    console.log(roomValue);

    const usernameValue = (
      document?.getElementById("username") as HTMLInputElement
    )?.value;
    console.log(usernameValue);

    if (roomValue === "" || usernameValue === "") {
      return;
    }

    const response = await fetch("http://localhost:3111/scrumpoker/joinroom", {
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

  return (
    <div>
      <section className="text-gray-600 body-font relative ">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Scrum Poker
            </h1>
            {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p> */}
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

      {/* <button onClick={handleJoinRoom}>join room</button>
      <button onClick={handleJoinRoom2}>join room 2</button> */}
    </div>
  );
}
