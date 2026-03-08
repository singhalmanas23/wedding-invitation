import { useState, useMemo, useCallback } from "react";
import { wardrobeConfig, DEFAULT_CHAPTER } from "./WardrobeConfig";

export type Audience = "men" | "women" | "all";

export function useWardrobePlanner() {
    const [selectedChapter, setSelectedChapter] = useState(DEFAULT_CHAPTER);
    const [selectedAudience, setSelectedAudience] = useState<Audience>("all");

    const currentWardrobe = useMemo(
        () => wardrobeConfig[selectedChapter] ?? wardrobeConfig[DEFAULT_CHAPTER],
        [selectedChapter]
    );

    const handleChapterChange = useCallback((chapterId: string) => {
        setSelectedChapter(chapterId);
    }, []);

    const selectors = useMemo(() => ({
        selectedChapter,
        selectedAudience,
        currentWardrobe,
    }), [selectedChapter, selectedAudience, currentWardrobe]);

    const actions = useMemo(() => ({
        setSelectedChapter: handleChapterChange,
        setSelectedAudience,
    }), [handleChapterChange, setSelectedAudience]);

    return { selectors, actions };
}
