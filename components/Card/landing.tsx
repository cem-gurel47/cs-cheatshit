import React from "react";
import { Grid, Card, Text, Avatar } from "@nextui-org/react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const landing = ({ description, title, icon }: Props) => {
  return (
    <Grid xs={12} sm={3}>
      <Card>
        <Card.Header>
          <Avatar
            css={{
              mr: "$4",
            }}
            icon={icon}
          />
          <Text h4>{title}</Text>
        </Card.Header>
        <Card.Body
          css={{
            padding: "0 $8 $4 $8",
          }}
        >
          <Text color="$accents8">{description}</Text>
        </Card.Body>
      </Card>
    </Grid>
  );
};

export default landing;
