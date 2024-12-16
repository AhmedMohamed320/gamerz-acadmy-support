import React from "react";
import PageModal from "../page-modal";
import { Page } from "@prisma/client";

type Props = { pages: Page[] };

const PagesTab = ({ pages }: Props) => {
  return (
    <div>
      <PageModal />
      <div className="mt-5 flex flex-wrap gap-5 ">
        {pages.map((page) => (
          <PageModal key={page.id} page={page} />
        ))}
      </div>
    </div>
  );
};

export default PagesTab;
