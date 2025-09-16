import { useState, type FC } from "react";
import { Dropdown } from "../Dropdown";
import { Textitems } from "../Dropdown/Dropdown.styled";
import UaFlag from "@/assets/UaFlag.svg?react";
import fontSizeOptions from "@/data/fontSizes.json";
import cities from "@/data/cities.json";
import { Title, WrappControlPanel, Wrapp } from "./ControlPanel.styled";
import { Label, Toggle } from "./Toggle";

export const ControlPanel: FC = () => {
  const [showFlag, setShowFlag] = useState(true);
  const [fontSize, setFontSize] = useState("14px");

  return (
    <Wrapp>
      <WrappControlPanel>
        <Title>Custom panel</Title>

        <Toggle
          checked={showFlag}
          onChange={setShowFlag}
          label="Показувати прапорець"
        />
        <hr />
        <div>
          <Label>змінити розмір шрифту</Label>
          <Dropdown
            search={false}
            options={fontSizeOptions}
            onSelect={(value) => setFontSize(value)}
            placeholder="Оберіть розмір шрифту"
          />
        </div>
      </WrappControlPanel>
      <Dropdown
        options={cities}
        onSelect={(value) => console.log("Selected:", value)}
        placeholder="Оберіть ваше місто"
        filterFn={(options, query) => {
          const q = query.toLowerCase();
          return options.filter((o) =>
            o.label.toLocaleLowerCase("uk").includes(q)
          ); // тут можна заюзати свій фільтр
        }}
        renderItem={(opt) => (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {showFlag && <UaFlag width={16} height={12} />}
            <Textitems size={fontSize}>{opt.label}</Textitems>
          </div>
        )}
      />
    </Wrapp>
  );
};

//приклад асинхронного запиту

// const asyncCities = async (query: string, signal?: AbortSignal) => {
// const res = await fetch(`/api/cities?query=${encodeURIComponent(query)}`, { signal });
// return await res.json();

//   return new Promise<{ label: string; value: string }[]>((resolve) => {
//     setTimeout(() => {
//       const all = [
//         { label: "Київ", value: "1" },
//         { label: "Дніпро", value: "2" },
//         { label: "Львів", value: "3" },
//         { label: "Одеса", value: "4" },
//         { label: "Харків", value: "5" },
//         { label: "Вінниця", value: "6" },
//         { label: "Полтава", value: "7" },
//       ];
//       resolve(all.filter(c => c.label.toLowerCase().includes(query.toLowerCase())));
//     }, 600);
//   });
// };

// return (
//   <Dropdown
//     search
//     asyncFilter={asyncCities}
//     minQueryLength={2}
//     debounceMs={300}
//     onSelect={(value) => console.log("Selected:", value)}
//   >
//     {(opt) => (
//       <Textitems>{opt.label}</Textitems>
//     )}
//   </Dropdown>
// );
// };
