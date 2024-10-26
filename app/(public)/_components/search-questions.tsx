"use client";

import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { IoSearch } from "react-icons/io5";
import { searchQuestions } from "@/app/actions/questions";
import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import QuestionModal from "./question-modal";

type Question = {
  id: string;
  title: string;
  answer: any[];
  children: any[];
  createdAt: Date;
  updatedAt: Date;
};

type Props = {};

const SearchQuestions = ({}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Question[]>([]);

  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await searchQuestions({
        where: { title: { contains: query, mode: "insensitive" } },
      });
      setResults(res || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const debouncedSearch = useCallback(
    debounce((nextValue: string) => handleSearch(nextValue), 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <div className="mb-5 max-w-md">
      <Input
        variant="bordered"
        label="Search questions..."
        endContent={<IoSearch />}
        value={inputValue}
        onChange={handleChange}
      />
      {loading && <Spinner />}
      <div className="space-y-5 mt-2">
        {results.map((question) => (
          <QuestionModal key={question.id} question={question} fullWidth />
        ))}
      </div>
    </div>
  );
};

export default SearchQuestions;
