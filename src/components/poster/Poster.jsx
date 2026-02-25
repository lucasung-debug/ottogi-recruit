import React, { forwardRef } from "react";
import { POSTER_W, FONT } from "../../utils/constants";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import PosterHeader from "./PosterHeader";
import PosterTable from "./PosterTable";
import CommonQuals from "./CommonQuals";
import AppPeriod from "./AppPeriod";
import ProcessChart from "./ProcessChart";
import AdditionalInfo from "./AdditionalInfo";
import Notes from "./Notes";

const Poster = forwardRef(function Poster(
  { title, jobs, processSteps, schedule, year, finalHireMonth, logoUrl },
  ref
) {
  const { theme } = useCompanyProfile();

  return (
    <div
      ref={ref}
      style={{
        width: POSTER_W,
        background: theme.white,
        fontFamily: FONT,
        fontWeight: 200,
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      }}
    >
      <PosterHeader title={title} logoUrl={logoUrl} />
      <PosterTable jobs={jobs} />
      <CommonQuals />
      <AppPeriod schedule={schedule} year={year} />
      <ProcessChart steps={processSteps} />
      <AdditionalInfo finalHireMonth={finalHireMonth} />
      <Notes />
    </div>
  );
});

export default Poster;
