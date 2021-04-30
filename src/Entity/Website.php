<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\WebsiteRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Validator\ThemeOwner;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "get", 
 *          "post"={"security"="is_granted('CONTENT_CREATE', object)"}
 *      },
 *      itemOperations={
 *          "get", 
 *          "put"={
 *              "security"="is_granted('CONTENT_EDIT', object)",
 *              "security_message"="Only the author can edit a website"
 *          }, 
 *          "delete"={
 *              "security"="is_granted('CONTENT_DELETE', object)",
 *              "security_message"="Only the author can delete a website"
 *          }
 *      },
 *      normalizationContext={"groups"={"website:read"}},
 *      denormalizationContext={"groups"={"website:write"}},
 *      attributes={
 *          "order"={"id": "DESC"},
 *          "pagination_items_per_page"=10
 *      },
 * )
 * @ORM\Entity(repositoryClass=WebsiteRepository::class)
 * @ORM\EntityListeners({"App\Doctrine\WebsiteSetOwnerListener"})
 */
class Website implements UserOwnedInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"website:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Assert\Url
     * @Assert\Length(
     *      min = 2,
     *      max = 255
     * )
     * @Groups({"website:read", "website:write"})
     */
    private $url;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"website:read", "website:write"})
     */
    private $comment;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"website:read"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=Theme::class, inversedBy="websites")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"website:read", "website:write"})
     * @Assert\Valid()
     * @Assert\NotBlank
     * @ThemeOwner
     */
    private $theme;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="websites")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"website:read"})
     */
    private $owner;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getTheme(): ?Theme
    {
        return $this->theme;
    }

    public function setTheme(?Theme $theme): self
    {
        $this->theme = $theme;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
