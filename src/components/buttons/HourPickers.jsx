import React, { useState } from "react";

export const HourPickers = (props) => {
    const [firstHour, setFirstHour] = useState("Select start");
    const [firstSelected, setFirstSelected] = useState(false);
    const [secondHour, setSecondHour] = useState("Select end");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSecond, setIsOpenSecond] = useState(false);
    const [taken, setTaken] = useState([
        { from: "02:15", to: "03:45" },
        { from: "01:00", to: "01:45" }
    ]);

  const toggling = (type) => {
    if (type === 1) {
      setIsOpen(!isOpen);
    } else {
      setIsOpenSecond(!isOpenSecond);
    }
  };

  const options = (from = null) => {
    let startHour = 1;
    let listHours = [];
    for (startHour; startHour <= 24; startHour++) {
      let startMinute = 0;
      for (startMinute; startMinute < 60; startMinute = startMinute + 10) {
        let formattedHour = startHour.toString();
        let formattedMinute = startMinute.toString();

        if (startHour < 10) {
          formattedHour = "0".concat(formattedHour);
        }
        if (startMinute < 10) {
          formattedMinute = "0".concat(formattedMinute);
        }
        var time = formattedHour.concat(":" + formattedMinute);
        listHours.push(time);
      }
    }

    taken.forEach((x) => {
      listHours = listHours.filter((y) => {
        if (x.from <= y && x.to >= y) {
          return 0;
        } else {
          return 1;
        }
      });
    });

    if (from !== null) {
      return listHours.filter((x) => x > from);
    }
    return listHours;
  };

  const onFirstOptionClicked = (value) => () => {
    setFirstHour(value);
    setIsOpen(false);
    setFirstSelected(true);
    props.setHours(value, 1);
  };

  const onSecondOptionClicked = (value) => () => {
    setSecondHour(value);
    setIsOpenSecond(false);
    props.setHours(value, 2);
  };

  return (
    <div className="hoursPickerWrapper">
      <div className="dropdowContainer">
        <div className="dropdownHeader" onClick={() => toggling(1)}>{firstHour}</div>
        {isOpen && (
          <div className="dropdownListContainer">
            <div className="dropdownHours">
              {options().map((option) => (
                <div className="listItem"
                  onClick={onFirstOptionClicked(option)}
                  key={Math.random()}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {firstSelected ? (
        <div className="dropdowContainer">
          <div className="dropdownHeader" onClick={() => toggling(2)}>
            {secondHour}
          </div>
          {isOpenSecond && (
            <div className="dropdownListContainer">
              <div className="dropdownList">
                {options(firstHour).map((option) => (
                  <div className="listItem"
                    onClick={onSecondOptionClicked(option)}
                    key={Math.random()}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
