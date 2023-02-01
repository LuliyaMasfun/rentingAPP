import React from "react";

const FilterProduct = ({ filterValueSelected }) => {

    const filterValueChanged = (e) => {
        filterValueSelected(e.target.value)
    }


    return (
        <div className="flex bg-white py-4 px-5 mb-3 rounded-sm border-solid border-black w-20">
            <select className="pr-2 mr-4 w-30" name="equipments" onChange={filterValueChanged}>
                <option value="all">All</option>
                <option value="CAMERA">Camera</option>
                <option value="LIGHT">Light</option>
                <option value="SOUND">Sound</option>
            </select>

        </div>
    )
};

export default FilterProduct;
