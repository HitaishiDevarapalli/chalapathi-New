import sys

def move_section(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()

    # Find the start and end of the "OUR PROGRAMS SECTION"
    programs_end = -1
    for i, line in enumerate(lines):
        if "{/* ═══ FROM THE CHAIRMAN SECTION ═══ */}" in line:
            programs_end = i
            break

    # Find the start and end of the "DYNAMIC CAMPUS VIDEO, LATEST NEWS & UPCOMING EVENTS" section
    news_start = -1
    news_end = -1
    for i, line in enumerate(lines):
        if "{/* ═══ DYNAMIC CAMPUS VIDEO, LATEST NEWS & UPCOMING EVENTS ═══ */}" in line:
            news_start = i
            break

    if news_start != -1:
        for i in range(news_start, len(lines)):
            if "{/* ═══ ADMISSIONS OPEN 2026 STRIP ═══ */}" in line:
                pass
            if "</section>" in lines[i] and "bg-gray-50 border-y border-gray-100 py-20 relative font-[var(--font-poppins)]" in "".join(lines[news_start:i+1]):
                # Make sure we hit the closing tag of that specific section
                # Looking at the code, it ends right before {/* ═══ ADMISSIONS OPEN 2026 STRIP ═══ */}
                pass

    # The exact lines found by my view_file tool:
    # 1602: {/* ═══ DYNAMIC CAMPUS VIDEO, LATEST NEWS & UPCOMING EVENTS ═══ */}
    # 1806:       </section>
    # 1807:
    # 1808:       {/* ═══ ADMISSIONS OPEN 2026 STRIP ═══ */}

    # Let's dynamically find it based on markers
    start_marker = "{/* ═══ DYNAMIC CAMPUS VIDEO, LATEST NEWS & UPCOMING EVENTS ═══ */}"
    end_marker = "{/* ═══ ADMISSIONS OPEN 2026 STRIP ═══ */}"
    insert_before = "{/* ═══ FROM THE CHAIRMAN SECTION ═══ */}"

    start_idx = -1
    end_idx = -1
    insert_idx = -1

    for i, line in enumerate(lines):
        if start_marker in line:
            start_idx = i
        if end_marker in line:
            end_idx = i
        if insert_before in line:
            insert_idx = i

    if start_idx != -1 and end_idx != -1 and insert_idx != -1:
        # The block to move is from start_idx to end_idx-1
        block = lines[start_idx:end_idx]
        
        # Remove the block from its current location
        del lines[start_idx:end_idx]
        
        # Adjust insert_idx if it was after the removed block (which it's not)
        
        # Insert the block at the new location
        lines = lines[:insert_idx] + block + lines[insert_idx:]
        
        with open(file_path, 'w') as f:
            f.writelines(lines)
        print("Moved the section successfully!")
    else:
        print(f"Could not find markers! start:{start_idx} end:{end_idx} insert:{insert_idx}")

move_section("src/pages/Home.tsx")
