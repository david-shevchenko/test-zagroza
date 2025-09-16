import { useState, useRef, useEffect, useMemo } from "react";
import IconDropdown from "@/assets/iconDropdown.svg?react";
import type { DropdownOption, DropdownProps } from "./Dropdown.types";
import {
  Wrapper,
  Trigger,
  Menu,
  Item,
  Icon,
  TextPlaceholder,
  Textitems,
  TextSelected,
  ItemsBlock,
} from "./Dropdown.styled";
import { SearchInput } from "./SearchInput.styled";

export const Dropdown = ({
  search = true,
  options = [],
  onSelect,
  placeholder = "Select...",
  className,
  renderItem,
  children,
  filterFn,
  asyncFilter,
  minQueryLength = 1,
  debounceMs = 300,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [remote, setRemote] = useState<DropdownOption[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setOpen(false);
    setQuery("");
    setRemote(null);
    setError(null);
  };

  const localFiltered = useMemo(() => {
    if (asyncFilter) return [];
    if (filterFn) return filterFn(options, query);
    const q = query.trim().toLocaleLowerCase("uk");
    if (!q) return options;
    return options.filter((o) => o.label.toLocaleLowerCase("uk").includes(q));
  }, [options, query, filterFn, asyncFilter]);

  useEffect(() => {
    if (!asyncFilter || !search || !open) return;
    const q = query.trim();
    if (q.length < minQueryLength) {
      setRemote(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await asyncFilter(q, ctrl.signal);
        if (!cancelled) setRemote(data);
      } catch (e: any) {
        if (!cancelled && e?.name !== "AbortError")
          setError("Помилка завантаження");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, debounceMs);

    return () => {
      cancelled = true;
      ctrl.abort();
      clearTimeout(timer);
    };
  }, [asyncFilter, search, open, query, minQueryLength, debounceMs]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const list = asyncFilter ? remote ?? [] : localFiltered;

  const selectedLabel = (remote ?? [])
    .concat(options)
    .find((o) => o.value === selected)?.label;

  return (
    <Wrapper ref={ref} className={className}>
      <Trigger onClick={() => setOpen((o) => !o)} isOpen={open}>
        {selected ? (
          <TextSelected>{selectedLabel ?? placeholder}</TextSelected>
        ) : (
          <TextPlaceholder>{placeholder}</TextPlaceholder>
        )}
        <Icon isOpen={open}>
          <IconDropdown />
        </Icon>
      </Trigger>

      {open && (
        <ItemsBlock>
          {search && (
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Пошук…"
              autoFocus
            />
          )}

          <Menu>
            {asyncFilter && query.trim().length < minQueryLength && (
              <Item>
                <Textitems>
                  Введіть щонайменше {minQueryLength} символ(и)
                </Textitems>
              </Item>
            )}

            {loading && (
              <Item>
                <Textitems>Завантаження…</Textitems>
              </Item>
            )}

            {error && (
              <Item>
                <Textitems>{error}</Textitems>
              </Item>
            )}

            {!loading && !error && list.length > 0 && (
              <>
                {list.map((option) => (
                  <Item
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                  >
                    {children
                      ? children(option)
                      : renderItem
                      ? renderItem(option)
                      : option.label}
                  </Item>
                ))}
              </>
            )}

            {!loading &&
              !error &&
              list.length === 0 &&
              (!asyncFilter || query.trim().length >= minQueryLength) && (
                <Item>
                  <Textitems>Нічого не знайдено</Textitems>
                </Item>
              )}
          </Menu>
        </ItemsBlock>
      )}
    </Wrapper>
  );
};
