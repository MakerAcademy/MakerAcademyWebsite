import ResponsiveText from "@components/ResponsiveText";
import { Typography, Box } from "@mui/material";
import React from "react";

const MISSION_STATEMENT =
  "Maker Academy increases the proficiency of current/potential MakerDAO contributors and justifies the public adoption of MakerDAO's products by facilitating the production of expert-curated content.";

const VISION_STATEMENT =
  "Maker Academy will strive to be the go-to source of education regarding MakerDAO. Learners of MakerDAO need no longer be presented with a conflicting, fragmented, and unorganized body of information.";

const STRATEGY =
  "Maker Academy's vision has many facets—all centered around educating various audiences about MakerDAO. In order to be scalable, Maker Academy will not produce this content by itself, but rather facilitate the educational relationship between learners and experts. To accomplish this, Maker Academy will build and maintain an educational platform that incentivizes learners to learn and experts to produce content. However, even though experts are knowledgeable about their domain, teaching/communicating their domain requires a different expertise. Maker Academy's team of pedagogists/communicators provide this expertise. Additionally, the Maker Academy team will use this expertise to structure the experts' content into curricula for the learners, giving them a streamlined path to their educational goals.";

const MissionVisionStrategy = () => {
  return (
    <div>
      {/* Mission */}
      <Box sx={{ mb: 4 }}>
        <ResponsiveText variant="h6" sx={{ mb: 2 }}>
          Mission
        </ResponsiveText>
        <Typography>{MISSION_STATEMENT}</Typography>
      </Box>

      {/* Vision */}
      <Box sx={{ mb: 4 }}>
        <ResponsiveText variant="h6" sx={{ mb: 2 }}>
          Vision
        </ResponsiveText>
        <Typography>{VISION_STATEMENT}</Typography>
      </Box>

      {/* Strategy */}
      <Box>
        <ResponsiveText variant="h6" sx={{ mb: 2 }}>
          Strategy
        </ResponsiveText>
        <Typography>{STRATEGY}</Typography>
      </Box>
    </div>
  );
};

export default MissionVisionStrategy;
