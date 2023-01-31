import React from "react";

const FilterProduct = (props) => {

    const filterValueChanged = (e) => {

        props.filterValueSelected(e.target.value)

    }


    return (
        <div className="flex bg-white py-4 px-5 mb-3 rounded-sm border-solid border-black">
            <select name="equipments" onChange={filterValueChanged}>
                <option value="all">All</option>
                <option value="CAMERA">Camera</option>
                <option value="LIGHT">Light</option>
                <option value="SOUND">Sound</option>
            </select>

        </div>
    )
};

export default FilterProduct;
