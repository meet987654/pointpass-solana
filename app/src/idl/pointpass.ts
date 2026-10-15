/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/pointpass.json`.
 */
export type Pointpass = {
  "address": "E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg",
  "metadata": {
    "name": "pointpass",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "awardPoints",
      "discriminator": [
        7,
        146,
        136,
        192,
        102,
        71,
        93,
        106
      ],
      "accounts": [
        {
          "name": "merchant",
          "writable": true,
          "signer": true,
          "relations": [
            "loyaltyProgram"
          ]
        },
        {
          "name": "loyaltyProgram",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  121,
                  97,
                  108,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "loyalty_program.merchant",
                "account": "loyaltyProgram"
              }
            ]
          }
        },
        {
          "name": "pointsMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "loyaltyProgram"
              }
            ]
          }
        },
        {
          "name": "customer"
        },
        {
          "name": "customerTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "customer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "pointsMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeProgram",
      "discriminator": [
        176,
        107,
        205,
        168,
        24,
        157,
        175,
        103
      ],
      "accounts": [
        {
          "name": "merchant",
          "writable": true,
          "signer": true
        },
        {
          "name": "loyaltyProgram",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  121,
                  97,
                  108,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "merchant"
              }
            ]
          }
        },
        {
          "name": "pointsMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "loyaltyProgram"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "rewardCost",
          "type": "u64"
        }
      ]
    },
    {
      "name": "redeem",
      "discriminator": [
        184,
        12,
        86,
        149,
        70,
        196,
        97,
        225
      ],
      "accounts": [
        {
          "name": "customer",
          "writable": true,
          "signer": true
        },
        {
          "name": "loyaltyProgram",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  121,
                  97,
                  108,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "loyalty_program.merchant",
                "account": "loyaltyProgram"
              }
            ]
          }
        },
        {
          "name": "pointsMint",
          "writable": true
        },
        {
          "name": "customerTokenAccount",
          "writable": true
        },
        {
          "name": "receipt",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  101,
                  109,
                  112,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "loyaltyProgram"
              },
              {
                "kind": "account",
                "path": "customer"
              },
              {
                "kind": "account",
                "path": "loyalty_program.redemption_count",
                "account": "loyaltyProgram"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "loyaltyProgram",
      "discriminator": [
        170,
        241,
        228,
        176,
        113,
        205,
        130,
        222
      ]
    },
    {
      "name": "redemptionReceipt",
      "discriminator": [
        220,
        43,
        221,
        166,
        174,
        69,
        111,
        26
      ]
    }
  ],
  "events": [
    {
      "name": "pointsAwarded",
      "discriminator": [
        201,
        95,
        152,
        50,
        215,
        83,
        188,
        38
      ]
    },
    {
      "name": "pointsRedeemed",
      "discriminator": [
        57,
        161,
        97,
        67,
        102,
        120,
        85,
        147
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "nameEmpty",
      "msg": "Loyalty program name cannot be empty."
    },
    {
      "code": 6001,
      "name": "nameTooLong",
      "msg": "Loyalty program name exceeds maximum length of 32 bytes."
    },
    {
      "code": 6002,
      "name": "invalidRewardCost",
      "msg": "Reward cost must be greater than zero."
    },
    {
      "code": 6003,
      "name": "unauthorized",
      "msg": "Action unauthorized: signer is not the merchant authority."
    },
    {
      "code": 6004,
      "name": "invalidAmount",
      "msg": "Invalid points amount specified."
    },
    {
      "code": 6005,
      "name": "insufficientPoints",
      "msg": "Customer has insufficient points balance."
    },
    {
      "code": 6006,
      "name": "mathOverflow",
      "msg": "Arithmetic operation resulted in an overflow."
    }
  ],
  "types": [
    {
      "name": "loyaltyProgram",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merchant",
            "docs": [
              "The merchant authority who controls this loyalty program"
            ],
            "type": "pubkey"
          },
          {
            "name": "pointsMint",
            "docs": [
              "The SPL token mint PDA for zero-decimal loyalty points"
            ],
            "type": "pubkey"
          },
          {
            "name": "rewardCost",
            "docs": [
              "Points required to redeem one reward unit"
            ],
            "type": "u64"
          },
          {
            "name": "totalAwarded",
            "docs": [
              "Lifetime total points awarded to customers"
            ],
            "type": "u64"
          },
          {
            "name": "totalRedeemed",
            "docs": [
              "Lifetime total points redeemed for rewards"
            ],
            "type": "u64"
          },
          {
            "name": "redemptionCount",
            "docs": [
              "Lifetime number of redemptions performed"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Canonical bump seed for the LoyaltyProgram PDA"
            ],
            "type": "u8"
          },
          {
            "name": "mintBump",
            "docs": [
              "Canonical bump seed for the PointsMint PDA"
            ],
            "type": "u8"
          },
          {
            "name": "name",
            "docs": [
              "Human-readable brand/business name (up to MAX_NAME_LENGTH bytes)"
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "pointsAwarded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "loyaltyProgram",
            "type": "pubkey"
          },
          {
            "name": "customer",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "pointsRedeemed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "loyaltyProgram",
            "type": "pubkey"
          },
          {
            "name": "customer",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "index",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redemptionReceipt",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "customer",
            "docs": [
              "The customer who redeemed loyalty points"
            ],
            "type": "pubkey"
          },
          {
            "name": "loyaltyProgram",
            "docs": [
              "The loyalty program where redemption occurred"
            ],
            "type": "pubkey"
          },
          {
            "name": "pointsBurned",
            "docs": [
              "Number of points burned for this redemption"
            ],
            "type": "u64"
          },
          {
            "name": "receiptNumber",
            "docs": [
              "Monotonically increasing redemption counter index"
            ],
            "type": "u64"
          },
          {
            "name": "timestamp",
            "docs": [
              "Unix timestamp of redemption"
            ],
            "type": "i64"
          },
          {
            "name": "bump",
            "docs": [
              "Canonical bump seed for this RedemptionReceipt PDA"
            ],
            "type": "u8"
          }
        ]
      }
    }
  ]
};
