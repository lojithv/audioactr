import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "One project",
      "100 phrases per project",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
    redirectUrl: "/signup",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "10 projects",
      "500 phrases per project",
      "Help center access",
      "Email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
    redirectUrl: "/payment",
  },
];

function PricingContent() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      {/* Hero unit */}
     
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Get Started For Free
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Simple, all-inclusive pricing. No hidden fees.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={3} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={6}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as "outlined" | "contained"}
                    onClick={() => navigate(tier.redirectUrl)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/home")}
          >
            Go To Home
          </Button>
      </Container>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
