"use client";

import { useRef, useState } from "react";

interface ItemData {
  type: "Fruit" | "Vegetable";
  name: string;
}

const initData: ItemData[] = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

export default function Home() {
  const [allItems, setAllItems] = useState(initData);
  const [fruits, setFruits] = useState<ItemData[]>([]);
  const [vagtables, setVagtables] = useState<ItemData[]>([]);
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  const onMoveItems = (item: ItemData) => {
    if (item.type === "Fruit") {
      setFruits([...fruits, item]);
    } else {
      setVagtables([...vagtables, item]);
    }

    setAllItems(allItems.filter((i) => i.name !== item.name));
    startCountDownByItem(item);
  };

  const startCountDownByItem = (item: ItemData) => {
    let countdown = 5;

    intervalRefs.current[item.name] = setInterval(() => {
      console.log(item.name, "start count down", countdown);

      countdown--;
      if (countdown === 0) {
        console.log(item.name, "หมดเวลา");
        clearInterval(intervalRefs.current[item.name]!);
        onMoveBack(item);
      }
    }, 1000);
  };

  const onMoveBack = (item: ItemData) => {
    if (intervalRefs.current[item.name]) {
      console.log("clearInterval");

      clearInterval(intervalRefs.current[item.name]!);
      intervalRefs.current[item.name] = null;
    }

    setAllItems((prevState) => [...prevState, item]);

    if (item.type === "Fruit") {
      setFruits((prevState) => prevState.filter((i) => i.name !== item.name));
    } else {
      setVagtables((prevState) =>
        prevState.filter((i) => i.name !== item.name)
      );
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-4">
        {allItems.map((item, index) => {
          return (
            <button
              key={index}
              className="outline-1 outline-solid outline-gray-300 rounded-sm p-4 hover:bg-gray-50 text-gray-500"
              onClick={() => onMoveItems(item)}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <div className="outline-1 outline-solid outline-gray-300 rounded-sm pb-4">
        <div className="text-center w-full p-4 border-b-1 border-solid border-gray-300 bg-gray-100 text-gray-500">
          Fruit
        </div>
        <div className="flex flex-col gap-4 px-4 pt-4">
          {fruits.map((item, index) => {
            return (
              <button
                key={index}
                className="outline-1 outline-solid outline-gray-300 rounded-sm p-4 hover:bg-gray-50 text-gray-500"
                onClick={() => onMoveBack(item)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="outline-1 outline-solid outline-gray-300 rounded-sm pb-4">
        <div className="text-center w-full p-4 border-b-1 border-solid border-gray-300 bg-gray-100 text-gray-500">
          Vagtables
        </div>
        <div className="flex flex-col gap-4 px-4 pt-4">
          {vagtables.map((item, index) => {
            return (
              <button
                key={index}
                className="outline-1 outline-solid outline-gray-300 rounded-sm p-4 hover:bg-gray-50 text-gray-500"
                onClick={() => onMoveBack(item)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
