import {
  Box,
  ActionIcon,
  Input,
  Text,
  Paper,
  ScrollArea,
  Accordion,
  AccordionControlProps,
  Center,
  Button,
  Badge,
  RingProgress,
  Flex,
} from "@mantine/core";
import { X, Search } from "lucide-react";
import { fetchNui } from "../../../utils/fetchNui";
import { VehicleProps } from "../../../types/garage";

type Props = {
  garage: string;
  search: string;
  setSearch: (search: string) => void;
  filteredVehicles: VehicleProps[];
};

const handleSpawn = async (vehicle: VehicleProps) => {
  await fetchNui("spawnVehicle", vehicle);
};

const handleCopy = async (plate: string) => {
  await fetchNui("copyPlate", plate);
};

function AccordionControl({
  vehicle,
  ...props
}: { vehicle: VehicleProps } & AccordionControlProps) {
  return (
    <Center>
      <Accordion.Control mr={4} chevron={null} {...props} />
      <Flex
        w={250}
        gap="5"
        pr={10}
        display={"flex"}
        justify="center"
        align={"center"}
      >
        <Button size="sm" variant="light" onClick={() => handleSpawn(vehicle)}>
          Spawn
        </Button>
        <Button
          size="sm"
          variant="light"
          onClick={() => handleCopy(vehicle.plate)}
        >
          Copy Plate
        </Button>
      </Flex>
    </Center>
  );
}

const Compact = (props: Props) => {
  return (
    <Flex
      w={"100%"}
      h={"100%"}
      align={"center"}
      justify={"center"}
      display={"flex"}
    >
      <Paper
        w={900}
        h={"90%"}
        display={"flex"}
        style={(theme) => ({
          backgroundColor: theme.colors.dark[9],
          justifyContent: "start",
          alignItems: "center",
          gap: theme.spacing.sm,
          flexDirection: "column",
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
          opacity: 0.99,
        })}
      >
        <Flex w={"100%"} align={"center"} gap={10}>
          <Text fw={700} size="lg">
            {props.garage}
          </Text>
          <span
            style={{
              flexGrow: 1,
              height: 3,
              background: "gray",
              borderRadius: 5,
            }}
          ></span>

          <ActionIcon
            variant="gradient"
            size="md"
            aria-label="Gradient action icon"
            gradient={{ from: "gray", to: "cyan", deg: 214 }}
          >
            <X size={20} />
          </ActionIcon>
        </Flex>
        <Input
          w={"100%"}
          placeholder="Search.."
          leftSection={<Search size={20} />}
          value={props.search} // Menambahkan value yang terikat dengan state search
          onChange={(event) => props.setSearch(event.currentTarget.value)} // Mengupdate state search setiap kali input berubah
        />
        <ScrollArea
          w="100%"
          h="auto"
          scrollbarSize={0}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "10",
          }}
        >
          <Accordion
            variant="filled"
            // transitionDuration={800}
            chevron={null}
            w="100%"
            // pr={15}
            // pl={15}
            // miw={950}
            mx="auto"
          >
            {props.filteredVehicles.map((vehicle, index) => (
              <Accordion.Item
                key={index}
                my={5}
                style={(theme) => ({
                  background: theme.colors.dark[8],
                })}
                value={`item-${index + 1}`}
              >
                <AccordionControl vehicle={vehicle}>
                  <Box fw={700}>
                    {vehicle.name}{" "}
                    <Badge mr={10} variant="light" color="gray">
                      {vehicle.plate}
                    </Badge>
                  </Box>
                </AccordionControl>
                <Accordion.Panel>
                  <Flex
                    h="fit"
                    w="100%"
                    style={{
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <Paper
                      w="fit"
                      style={(theme) => ({
                        backgroundColor: theme.colors.dark[9],
                        borderRadius: theme.radius.md,
                        padding: theme.spacing.md,
                        display: "flex",
                      })}
                    >
                      {[
                        { label: "Fuel", value: vehicle.fuel },
                        { label: "Engine", value: vehicle.enginehealth },
                        { label: "Body", value: vehicle.bodyhealth },
                      ].map((item, index) => (
                        <Flex
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Text fw={700}>{item.label}</Text>
                          <RingProgress
                            size={60}
                            thickness={5}
                            roundCaps
                            sections={[
                              {
                                value: item.value,
                                color:
                                  item.value > 80
                                    ? "green"
                                    : item.value > 40
                                    ? "yellow"
                                    : "red",
                              },
                            ]}
                          />
                        </Flex>
                      ))}
                    </Paper>
                    <Paper
                      w="100%"
                      style={(theme) => ({
                        backgroundColor: theme.colors.dark[9],
                        borderRadius: theme.radius.md,
                        padding: theme.spacing.md,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 10,
                      })}
                    >
                      {[
                        { label: "Engine", value: vehicle.engine },
                        {
                          label: "Transmission",
                          value: vehicle.transmission,
                        },
                        { label: "Suspension", value: vehicle.suspension },
                        { label: "Brakes", value: vehicle.brakes },
                        { label: "Turbo", value: vehicle.turbo },
                        { label: "Armor", value: vehicle.armor },
                      ].map((item) => (
                        <Flex
                          key={item.label}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "100%",
                          }}
                        >
                          <Text fw={600}>{item.label}</Text>
                          <Text fw={600} size="lg">
                            {item.value}
                          </Text>
                        </Flex>
                      ))}
                    </Paper>
                  </Flex>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </ScrollArea>
      </Paper>
    </Flex>
  );
};

export default Compact;
