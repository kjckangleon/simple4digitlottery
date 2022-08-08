import { Grid, Button, Text, Spacer } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import React from "react";

type Row = {
  id: string;
  value: number;
  clicked: boolean;
};

const Ticket = () => {
  const { setTheme } = useNextTheme();
  const [row1Value, setRow1Value] = React.useState<Array<React.ReactElement>>([]);
  const [isDark, setIsDark] = React.useState(true);

  const generateValues = () => {
    const maxNumber: number = 9;
    let row: number = 1;
    let counter: number = 1;
    let container: Array<React.ReactElement> = [];
    let gridContainerArray: Array<React.ReactElement> = [];

    const gridContainer = (item: any) => {
      return (
        <Grid xs={3} justify="center" direction="column">
          {item}
        </Grid>
      );
    };

    const itemContainer = (item: Row) => {
      return (
        <div key={item.id}>
          <Button
            bordered={!item.clicked}
            size="xs"
            id={item.id}
            color={
              item.id.includes("row1")
                ? "primary"
                : item.id.includes("row2")
                ? "secondary"
                : "success"
            }
            css={{ width: "0" }}
            onClick={handleOnClick}
          >
            {item.value}
          </Button>
          <Spacer y={0.5} />
        </div>
      );
    };

    while (row <= 3) {
      if (counter <= maxNumber) {
        const item: Row = {
          id: `row${row}-${counter}`,
          value: counter,
          clicked: false,
        };
        container.push(itemContainer(item));
      }

      if (counter == 9) {
        if (row == 3) {
          gridContainerArray.push(gridContainer(container));
          setRow1Value(gridContainerArray);
          break;
        }
        counter = 0;
        row++;
        gridContainerArray.push(gridContainer(container));
        container = [];
      }
      counter++;
    }
  };

  const handleOnClick = (event: any) => {
    console.log(event);
  };

  React.useEffect(() => {
    generateValues();
  }, []);

  return (
    <Grid.Container css={{ backgroudColor: "black" }} gap={1} direction="row">
      <Grid
        css={{ paddingTop: "$12" }}
        xs={12}
        justify="center"
        alignItems="center"
      >
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
            weight: "bold",
          }}
        >
          Simple 4 digit lottery
        </Text>
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          css={{ paddingLeft: "$10", paddingTop: "$5" }}
        />
      </Grid>
      <Grid xs={12} justify="center">
        <Text>Choose 1 number per row total of 4 numbers</Text>
      </Grid>
      <Grid.Container xs={12} justify="center" gap={3}>
        {row1Value}
      </Grid.Container>
    </Grid.Container>
  );
};

export default Ticket;
