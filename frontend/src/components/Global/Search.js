import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "./Button";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border: 1px solid #b3b3b3;
    border-radius: 2.5rem;
    background-color: transparent;
    height: 3rem;
    width: 100%;
    max-width: 23.9375rem;
    align-items: center;
    padding: 0 1rem;
    @media (max-width:680px) {
        width:100%;
        max-width: 100%;

  }
    input {
        border: none;
        outline: none;
        text-indent: 0.2rem;
        width: 100%;
        background: transparent;
    }
    button {
        border-radius: 2.5rem;
        padding: 0.1rem 0.3rem;
    }
`;
export const Search = ({ fetchedData, callbackSearchedVal }) => {
    const [searchParam, setSearchParam] = useState("");
    const [refineData, setRefineData] = useState([]);
    const handleSearchInputChange = (e) => {
        setSearchParam(e.target.value);
    };

    const handleSearch = useCallback(() => {
        if (fetchedData) {
            let filterdata = fetchedData.filter((val) =>
                searchParam === ""
                    ? val
                    : val?.full_name?.toLowerCase().includes(searchParam.toLowerCase()) ||
                      val?.email?.toLowerCase().includes(searchParam.toLowerCase()) ||
                      val?.business_name?.toLowerCase().includes(searchParam.toLowerCase()) ||
                      val?.website_address?.toString().includes(searchParam) ||
                      val?.phone_number?.toString().includes(searchParam.toString())
            );
            setRefineData(filterdata);
        }
    }, [fetchedData, searchParam]);

    useEffect(() => {
        callbackSearchedVal(refineData && refineData);
    }, [refineData, callbackSearchedVal]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    return (
        <Wrapper>
            <input
                type="search"
                placeholder="Search User here.."
                value={searchParam}
                onChange={handleSearchInputChange}
            />
            <Button
                textTransform={"uppercase"}
                fontSize={12}
                maxWidth={100}
                height={24}
                onClick={(searchParam) => handleSearch}
            >
                Search
            </Button>
        </Wrapper>
    );
};
