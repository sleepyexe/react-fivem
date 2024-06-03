import { Flex, Grid, ActionIcon, Text, Input, Paper, Container, Box, SimpleGrid } from '@mantine/core'
import { X, Search } from 'lucide-react'
import { VehicleProps } from '../../../types/garage';

type Props = {
    garage: string;
    search: string;
    setSearch: (search: string) => void;
    filteredVehicles: VehicleProps[];
};


const Full = (props: Props) => {
  return (
    <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'} display={'flex'}>
        <Paper w={1400} h={'80%'}         display={"flex"}
        style={(theme) => ({
          backgroundColor: theme.colors.dark[9],
          justifyContent: "start",
          alignItems: "center",
          gap: theme.spacing.sm,
          flexDirection: "column",
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
          opacity: 0.99,
        })}>
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
        <Flex h={"100%"} w={"100%"} display={'flex'}>
            <Flex flex={1} display={'flex'} direction={'column'} justify={'start'} align={'center'} gap={20} pr={5}>
              <Input
                w={"100%"}
                placeholder="Search.."
                leftSection={<Search size={20} />}
                value={props.search} // Menambahkan value yang terikat dengan state search
                onChange={(event) => props.setSearch(event.currentTarget.value)} // Mengupdate state search setiap kali input berubah
              />
              <Grid bg='red' w={'100%'} h='100%'>
                <Grid.Col span={4}>1</Grid.Col>
                <Grid.Col span={4}>2</Grid.Col>
                <Grid.Col span={4}>3</Grid.Col>
              </Grid>
            </Flex>
            <Flex bg={'yellow'} w={'25%'} h={'100%'} style={{
                opacity: 0.9
            }}>

            </Flex>
        </Flex>
        </Paper>
    </Flex>
    )
}

export default Full