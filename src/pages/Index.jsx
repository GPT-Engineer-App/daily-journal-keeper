import React, { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Input, Textarea, VStack, Text, Divider, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { FaPlus, FaBook, FaUndo } from "react-icons/fa";

const Index = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState(() => {
    const storedEntries = localStorage.getItem("journalEntries");
    return storedEntries ? JSON.parse(storedEntries) : [];
  });
  const [previousEntries, setPreviousEntries] = useState(null);
  const [viewEntries, setViewEntries] = useState(false);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() !== "") {
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        text: entry,
      };
      setPreviousEntries(entries);
      setEntries((prevEntries) => {
        const updatedEntries = [...prevEntries, newEntry];
        localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
        return updatedEntries;
      });
      setEntry("");
    }
  };

  const handleUndo = () => {
    if (previousEntries) {
      setEntries(previousEntries);
      setPreviousEntries(null);
      localStorage.setItem("journalEntries", JSON.stringify(previousEntries));
    }
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="container.md" py={8}>
      <Button onClick={toggleColorMode} mb={4}>
        {colorMode === "light" ? <FaMoon /> : <FaSun />}
      </Button>
      {!viewEntries ? (
        <>
          <Heading as="h1" size="xl" mb={8}>
            Daily Journal
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input value={entry} onChange={(e) => setEntry(e.target.value)} placeholder="Write your journal entry..." />
              <Button type="submit" colorScheme="blue" leftIcon={<FaPlus />}>
                Add Entry
              </Button>
            </VStack>
          </form>
          {entries.length > 0 && (
            <>
              <Heading as="h2" size="lg" mt={8} mb={4}>
                Recent Entries
              </Heading>
              {entries.slice(-3).map((entry) => (
                <Box key={entry.id} mb={4}>
                  <Text fontWeight="bold">{entry.date}</Text>
                  <Text>{entry.text}</Text>
                  <Divider my={2} />
                </Box>
              ))}
            </>
          )}
          <Button mt={8} colorScheme="teal" onClick={() => setViewEntries(true)} leftIcon={<FaBook />}>
            View All Entries
          </Button>
          {previousEntries && (
            <Button mt={4} colorScheme="gray" onClick={handleUndo} leftIcon={<FaUndo />}>
              Undo
            </Button>
          )}
        </>
      ) : (
        <>
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            Journal Entries
          </Heading>
          {entries.map((entry) => (
            <Box key={entry.id} mb={4}>
              <Text fontWeight="bold">{entry.date}</Text>
              <Text>{entry.text}</Text>
              <Divider my={2} />
            </Box>
          ))}
          <Button mt={8} colorScheme="blue" onClick={() => setViewEntries(false)}>
            Back to Journal
          </Button>
        </>
      )}
    </Container>
  );
};

export default Index;
