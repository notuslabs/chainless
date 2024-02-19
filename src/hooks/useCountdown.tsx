import { useEffect, useState } from "react";

function formatTime(time: number) {
  return time.toString().padStart(2, "0");
}

type UseCountdownProps = {
  expiresInMS?: number;
  timestamp?: number;
};

/**
 *
 * @param expires must be a time representation in milliseconds
 * @example const { timeUnits } = useCountdown({ expiresInMS: 60000 });
 */
export default function useCountdown({
  expiresInMS = 60000,
  timestamp
}: UseCountdownProps) {
  const [expiryDate] = useState(new Date());
  const [isFinished, setFinished] = useState(false);
  const [timeUnits, setTimeUnits] = useState({
    years: "0",
    days: "0",
    hours: "0",
    minutes: "0",
    seconds: "0"
  });

  useEffect(() => {
    function calculateTimeUnits(timeDifference: number) {
      const seconds = Math.floor(timeDifference / 1000);
      setTimeUnits({
        years: formatTime(Math.floor(seconds / (365 * 24 * 60 * 60))),
        days: formatTime(
          Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60))
        ),
        hours: formatTime(Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))),
        minutes: formatTime(Math.floor((seconds % (60 * 60)) / 60)),
        seconds: formatTime(seconds % 60)
      });
    }

    function updateCountdown() {
      const now = new Date().getTime();
      const countDownDate = !timestamp
        ? new Date(expiryDate.getTime() + expiresInMS).getTime()
        : timestamp;
      const timeDifference = countDownDate - now;

      if (timeDifference <= 0) {
        // Countdown finished
        clearInterval(interval);
        setFinished(true);
      } else {
        calculateTimeUnits(timeDifference);
      }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiresInMS, timestamp]);

  return { timeUnits, isFinished };
}
