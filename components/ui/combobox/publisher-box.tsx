"use client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import {
  getAllPublisherClient,
  getInsertPublisherClient,
} from "@/app/_api/services/publisherService";
import { Publisher } from "@/app/_models/publisher";

const PublisherComboBox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllPublisherClient();

      if (res.status !== 200) {
        throw new Error("User ile ilgili bir hata oluştu");
      }

      const response = res.data;
      setPublishers(response);
    } catch (error) {
      console.log("publisher try&catch hata -> ", error);
    }
  };

  //   const createPublisher = async () => {
  //     try {
  //       const res = await getInsertPublisherClient(inputValue);
  //       if (res.status === 201) {
  //         fetchData();
  //       } else {
  //         console.log("publisher insert axios kodunda hata! ", res);
  //       }
  //     } catch (error) {
  //       console.error("Publisher insert ederken hata oluştu try&catch ", error);
  //     }
  //   };

  //   const handleSearchInputChange = (value: string) => {
  //     const newValue = value;
  //     setInputValue(newValue);
  //   };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value !== 0
            ? publishers.find((p) => p.publisher_id == value)?.publisher_name
            : "Yayınevi için ara..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {publishers.map((p) => (
              <CommandItem
                key={p.publisher_id}
                value={p.publisher_name}
                onSelect={(currentValue) => {
                  const selectedPublisherValue =
                    publishers.find(
                      (p) => p.publisher_name.toLowerCase() == currentValue
                    )?.publisher_id ?? 0;
                  setValue(
                    selectedPublisherValue == value ? 0 : selectedPublisherValue
                  );
                  setOpen(false);
                }}
              >
                {p.publisher_name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value == p.publisher_id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PublisherComboBox;
