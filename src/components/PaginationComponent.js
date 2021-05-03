import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationComponent(props) {
  const { pages, active, setActive } = props;

  function makeItems() {
    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          onClick={() => setActive(number)}
          active={number === active}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  }

  return (
    <div>
      <Pagination variant="dark" size="lg">
        {makeItems().map((item) => item)}
      </Pagination>
    </div>
  );
}
