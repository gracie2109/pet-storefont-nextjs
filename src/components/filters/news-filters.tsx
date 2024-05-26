'use client'

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import React, {useState} from "react";
import {useDebounce} from "@/hooks/use-debound";
import {Checkbox} from "@/components/ui/checkbox";
import {ScrollArea} from "@/components/ui/scroll-area";

export function NewsFilters({tags}: { tags: any }) {
    const [search, setSearch] = useState("");
    const searchText = useDebounce(search, 400);
    return (
        <div className="m-auto p-4 space-y-8">
            
            <div id="search" className="space-y-5 relative">
                <Label className="text-inner__line">Search </Label>
                <Input
                    type="text"
                    placeholder="Type keywords.."
                    className="relative pl-3 pr-1 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-0 focus:ring-[#6E23DD] focus:border-transparent" // Add additional styling as needed
                    value={search ? search : ""}
                    name="search"
                    onChange={(e: any) => setSearch(e.target.value)}
                />
            </div>
                <div className="space-y-8">
                    <Label className="text-inner__line ">Tags </Label>
                    <ScrollArea className="h-72 ">
                    {Array.isArray(tags) && tags.map((tag) => (
                        <div key={tag}>
                            <div className="flex items-center space-x-2 relative my-2">
                                <Checkbox id={tag} name="filter_new_bt_tags"/>
                                <label htmlFor={tag}
                                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {tag}
                                </label>
                            </div>
                        </div>
                    ))}
                    </ScrollArea>
                </div>



        </div>
    )
}