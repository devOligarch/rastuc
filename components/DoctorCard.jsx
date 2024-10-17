import { Avatar, Badge, Button, Card } from "@mantine/core";
import {
  IconChevronRight,
  IconLocation,
  IconLocationPin,
  IconMapPin,
} from "@tabler/icons-react";
import React from "react";

function DoctorCard({ doctor }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="-z-10">
      <div className="flex space-x-4 mb-4">
        <Avatar size={72} alt="it's me">
          {doctor?.fullName
            ?.split(" ")
            .slice(0, 1)
            .map((name) => name.charAt(0))}
        </Avatar>
        <div>
          <strong>{`${doctor?.title} ${doctor?.fullName}`}</strong>
          <p className="text-slate-600 font-light">{doctor?.specialty}</p>

          <span className="flex space-x-2 mt-2 items-center">
            <IconMapPin stroke={1} color="red" size={16} />
            <p className="text-slate-600 font-light">
              {doctor?.practiceAddress}
            </p>
          </span>

          <div className="flex mt-1 flex-wrap gap-2">
            {doctor?.myPreferences?.offersHomeCare && (
              <Badge color="#00857C" variant="light" size="sm">
                <p className="normal-case font-light">Home care</p>
              </Badge>
            )}
            {doctor?.myPreferences?.offersClinicVisitCare && (
              <Badge color="#00857C" variant="light" size="sm">
                <p className="normal-case font-light">Clinic visit</p>
              </Badge>
            )}
            {doctor?.myPreferences?.offersTeleconsultCare && (
              <Badge color="#00857C" variant="light" size="sm">
                <p className="normal-case font-light">Teleconsultation</p>
              </Badge>
            )}
          </div>
        </div>
      </div>
      <Button
        color="#00857C"
        rightSection={<IconChevronRight size={16} />}
        fullWidth>
        Book appointment
      </Button>
    </Card>
  );
}

export default DoctorCard;
