import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, Textarea, VStack, Text, Divider } from "@chakra-ui/react";
import { FaPlus, FaBook } from "react-icons/fa";

const Index = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [viewEntries, setViewEntries] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() !== "") {
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        text: entry,
      };
      setEntries([...entries, newEntry]);
      setEntry("");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      {!viewEntries ? (
        <>
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
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
          <Button mt={8} colorScheme="teal" onClick={() => setViewEntries(true)} leftIcon={<FaBook />}>
            View Entries
          </Button>
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
