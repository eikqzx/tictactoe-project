import { keyframes } from '@emotion/react';
import { Typography } from "@mui/joy";
const jumpAnimation = keyframes`
  0% { transform: translateY(0); }
  20% { transform: translateY(-5px); }
  40% { transform: translateY(0); }
  100% { transform: translateY(0); }
`;
export default function Redirecting() {
    return (
      <Typography sx={{ display: 'inline-block' }}>
        Redirecting
        <span
          style={{
            display: 'inline-block',
            animation: `${jumpAnimation} 0.6s infinite ease-in-out`,
          }}
        >
          ...
        </span>
      </Typography>
    );
  }