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
  const [row1Value, setRow1Value] = React.useState<Array<React.ReactElement>>(
    []
  );
  const [data, setData] = React.useState<Array<Row>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedValues, setSelectedValues] = React.useState([""]);
  const [isDark] = React.useState(true);

  const generateValues = (item: Array<Row>) => {
    let container: Array<React.ReactElement> = [];
    let gridContainerArray: Array<React.ReactElement> = [];

    item.map((item, index) => {
      if (index <= 0 || index <= 8) {
        if (index != 8) {
          container.push(itemContainer(item));
        } else {
          gridContainerArray.push(gridContainer(container, item.id));
          container = [];
        }
      } else if (index <= 9 || index <= 17) {
        if (index != 17) {
          container.push(itemContainer(item));
        } else {
          gridContainerArray.push(gridContainer(container, item.id));
          container = [];
        }
      } else if (index <= 18 || index <= 26) {
        if (index != 26) {
          container.push(itemContainer(item));
        } else {
          gridContainerArray.push(gridContainer(container, item.id));
          container = [];
        }
      } else if (index <= 27 || index <= 35) {
        if (index != 35) {
          container.push(itemContainer(item));
        } else {
          gridContainerArray.push(gridContainer(container, item.id));
          container = [];
        }
      }
    });

    setRow1Value(gridContainerArray);
  };

  const gridContainer = (item: any, id: string) => {
    return (
      <Grid xs={3} justify="center" direction="column" key={id}>
        {item}
      </Grid>
    );
  };

  const itemContainer = (item: Row) => {
    return (
      <div key={item.id}>
        <Button
          bordered={!item.clicked}
          size="lg"
          id={item.id}
          color={
            item.id.includes("row1")
              ? "primary"
              : item.id.includes("row2")
              ? "secondary"
              : item.id.includes("row3")
              ? "success"
              : "warning"
          }
          css={{ width: "0" }}
          onClick={() => handleOnClick(item)}
        >
          {item.value}
        </Button>
        <Spacer y={0.5} />
      </div>
    );
  };

  const initializeValues = () => {
    const maxNumber: number = 9;
    let row: number = 1;
    let counter: number = 1;
    let container: Array<Row> = [];

    while (row <= 4) {
      if (counter <= maxNumber) {
        const item: Row = {
          id: `row${row}-${counter}`,
          value: counter,
          clicked: false,
        };
        container.push(item);
      }

      if (counter == 9) {
        if (row == 4) {
          break;
        }
        counter = 0;
        row++;
      }
      counter++;
    }
    setData(container);
  };

  React.useEffect(() => {
    initializeValues();
  }, []);

  React.useEffect(() => {
    if (data.length > 0) {
      generateValues(data);
    }
  }, [data]);

  React.useEffect(() => {
    if (row1Value.length > 0) {
      setIsLoading(false);
    }
  }, [row1Value]);

  const handleOnClick = (item: Row) => {
    item.clicked = !item.clicked;
    setData([...data, item]);
    setSelectedValues([
      ...selectedValues,
      !item.clicked ? "" : item.value.toLocaleString(),
    ]);
  };

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleSubmit = () => {
    const counter = 4;
    const winningNumber = [];
    
    for (let index = 0; index < counter; index++) {
      winningNumber.push(getRandomIntInclusive(1, 9));
    }
    console.log(winningNumber);
  };

  return (
    <>
      {!isLoading && (
        <Grid.Container
          css={{ backgroudColor: "black" }}
          gap={1}
          direction="row"
        >
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
            <Text h2>{selectedValues.map((item) => item)}</Text>
          </Grid>
          <Grid xs={12} justify="center">
            <Text>Choose 1 number per row total of 4 numbers</Text>
          </Grid>
          <Grid.Container
            xs={12}
            justify="center"
            gap={2}
            css={{ textAlign: "-webkit-center" }}
          >
            {row1Value}
          </Grid.Container>
          <Grid.Container xs={12} justify="center" gap={2}>
            {selectedValues.length == 5 && (
              <Button color="error" size="xl" onClick={handleSubmit}>
                SUBMIT
              </Button>
            )}
          </Grid.Container>
        </Grid.Container>
      )}
    </>
  );
};

export default Ticket;
