"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, Input, Label, Checkbox, Button } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import cls from "classnames";

const apiPath = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const room = searchParams.get("room") || undefined;

  const [iAmScrumMaster, setIAmScrumMaster] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // const

    const roomValue = (document?.getElementById("room") as HTMLInputElement)?.value;

    const usernameValue = (document?.getElementById("username") as HTMLInputElement)?.value;

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
        iAmScrumMaster: iAmScrumMaster,
      }),
    });

    const data = await response.json();
    console.log("data");
    console.log(data);

    if (data.id) {
      router.push("/room/" + roomValue + "/" + usernameValue);
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <section className="text-gray-600 body-font relative ">
        <form onSubmit={handleSubmit}>
          <div className="container px-5 py-24 mx-auto">
            <div className="mx-auto max-w-[348px]">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <h1 className="sm:text-3xl text-2xl font-light   text-white ">
                    <span className="title-font font-bold">Scrum</span> Poker
                  </h1>
                  <p className=" text-sm font-light title-font mb-4 text-white ">An easy to use voting tool</p>
                </div>

                <div className="p-2 w-full">
                  <Field>
                    <Label htmlFor="room" className="text-sm/6 font-medium text-white">
                      Room
                    </Label>
                    <Input
                      id="room"
                      name="room"
                      required
                      className={cls(
                        "mt-3 block w-full rounded-lg border-none bg-white/5 py-2.5 px-3 text-sm/6 text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                      defaultValue={room}
                    />
                  </Field>
                </div>
                <div className="p-2 w-full">
                  <Field>
                    <Label htmlFor="username" className="text-sm/6 font-medium text-white">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      required
                      className={cls(
                        "mt-3 block w-full rounded-lg border-none bg-white/5 py-2.5 px-3 text-sm/6 text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                </div>

                <div className="w-full max-w-md px-2 mt-4">
                  <Field className="flex items-center gap-2">
                    <Checkbox
                      id="is"
                      name="is"
                      checked={iAmScrumMaster}
                      onChange={() => {
                        setIAmScrumMaster(!iAmScrumMaster);
                      }}
                      className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
                    >
                      <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                    </Checkbox>
                    <p className="text-white ml-1">Join as a scrum master</p>
                  </Field>
                </div>

                <div className="p-2 mt-8 w-full">
                  <Button
                    type="submit"
                    // onClick={handleSubmit}
                    className="w-full items-center gap-2 rounded-md bg-gray-700 py-2.5 px-3 text-sm/6 font-semibold text-white text-center shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white hover:bg-gray-600"
                  >
                    Join Room
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
