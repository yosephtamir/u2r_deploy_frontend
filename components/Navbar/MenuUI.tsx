export function MenuIcon({ style, toggle, toggler }: { style?: string; toggle?: boolean; toggler: () => void }) {
    if (toggle) {
        // Close Icon
        return (
            <div className={`${style}`} onClick={toggler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                    <g>
                        <mask
                            id="mask0_1327_22604"
                            style={{ maskType: 'alpha' }}
                            width="32"
                            height="32"
                            x="0"
                            y="0"
                            maskUnits="userSpaceOnUse"
                        >
                            <path fill="#D9D9D9" d="M0 0H32V32H0z"></path>
                        </mask>
                        <g mask="url(#mask0_1327_22604)">
                            <path
                                fill="#1C1B1F"
                                d="M8.534 25.333l-1.867-1.866L14.134 16 6.667 8.533l1.867-1.866L16 14.133l7.467-7.466 1.867 1.866L17.867 16l7.467 7.467-1.867 1.866L16 17.867l-7.466 7.466z"
                            ></path>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }

    return (
        // Open Icon
        <div className={`${style}`} onClick={toggler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                <g>
                    <g fill="#000">
                        <path d="M28 10.333H4c-.547 0-1-.453-1-1 0-.546.453-1 1-1h24c.547 0 1 .454 1 1 0 .547-.453 1-1 1z"></path>
                        <path d="M28 17H4c-.547 0-1-.453-1-1 0-.547.453-1 1-1h24c.547 0 1 .453 1 1 0 .547-.453 1-1 1z"></path>
                        <path d="M28 23.667H4c-.547 0-1-.454-1-1 0-.547.453-1 1-1h24c.547 0 1 .453 1 1 0 .546-.453 1-1 1z"></path>
                    </g>
                </g>
            </svg>
        </div>
    );
}