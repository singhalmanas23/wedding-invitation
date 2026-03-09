import { useState, useMemo, useCallback, useEffect } from "react";
import { wardrobeConfig, DEFAULT_CHAPTER, Look } from "./WardrobeConfig";

export type Audience = "men" | "women" | "all";

export function useWardrobePlanner() {
    const [selectedChapter, setSelectedChapter] = useState(DEFAULT_CHAPTER);
    const [selectedAudience, setSelectedAudience] = useState<Audience>("all");

    // Interactive styling state
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedFabric, setSelectedFabric] = useState("");
    const [activeAccessories, setActiveAccessories] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<"realistic" | "illustration">("illustration");
    const [userAvatar, setUserAvatar] = useState<string | null>(null);

    // Garment selection — the core of the dress-up engine
    const [selectedLookMen, setSelectedLookMen] = useState<Look | null>(null);
    const [selectedLookWomen, setSelectedLookWomen] = useState<Look | null>(null);

    const currentWardrobe = useMemo(
        () => wardrobeConfig[selectedChapter] ?? wardrobeConfig[DEFAULT_CHAPTER],
        [selectedChapter]
    );

    // Reset styling + auto-select first garment when chapter changes
    useEffect(() => {
        setSelectedColor(currentWardrobe.palette.recommended[0]?.name || "");
        setSelectedFabric(currentWardrobe.fabrics[0] || "");
        setActiveAccessories([]);
        setSelectedLookMen(currentWardrobe.men[0] ?? null);
        setSelectedLookWomen(currentWardrobe.women[0] ?? null);
    }, [selectedChapter, currentWardrobe]);

    const handleChapterChange = useCallback((chapterId: string) => {
        setSelectedChapter(chapterId);
    }, []);

    const toggleAccessory = useCallback((acc: string) => {
        setActiveAccessories(prev =>
            prev.includes(acc) ? prev.filter(a => a !== acc) : [...prev, acc]
        );
    }, []);

    const selectors = useMemo(() => ({
        selectedChapter,
        selectedAudience,
        currentWardrobe,
        selectedColor,
        selectedFabric,
        activeAccessories,
        viewMode,
        userAvatar,
        selectedLookMen,
        selectedLookWomen,
    }), [selectedChapter, selectedAudience, currentWardrobe, selectedColor, selectedFabric, activeAccessories, viewMode, userAvatar, selectedLookMen, selectedLookWomen]);

    const actions = useMemo(() => ({
        setSelectedChapter: handleChapterChange,
        setSelectedAudience,
        setSelectedColor,
        setSelectedFabric,
        setActiveAccessories,
        toggleAccessory,
        setViewMode,
        setUserAvatar,
        setSelectedLookMen,
        setSelectedLookWomen,
    }), [handleChapterChange, setSelectedAudience, toggleAccessory]);

    return { selectors, actions };
}
