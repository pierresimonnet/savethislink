<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ThemeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "get", 
 *          "post"={"security"="is_granted('ROLE_USER')"}
 *      },
 *      itemOperations={
 *          "get", 
 *          "put"={
 *              "security"="is_granted('THEME_EDIT', object)",
 *              "security_message"="Only the owner of the theme can edit it"
 *          }, 
 *          "delete"={
 *              "security"="is_granted('THEME_DELETE', object)",
 *              "security_message"="Only the owner of the theme can delete it"
 *          }
 *      },
 *      normalizationContext={"groups"={"theme:read"}},
 *      denormalizationContext={"groups"={"theme:write"}},
 *      attributes={
 *          "order"={"createdAt": "DESC"},
 *          "pagination_items_per_page"=10
 *      },
 * )
 * @ApiFilter(SearchFilter::class, properties={"title": "partial", "description": "partial", "owner": "exact"})
 * @ApiFilter(OrderFilter::class, properties={"websitesCount"})
 * @ApiFilter(PropertyFilter::class)
 * @ORM\Entity(repositoryClass=ThemeRepository::class)
 * @ORM\EntityListeners({"App\Doctrine\ThemeSetSlugListener", "App\Doctrine\ThemeSetOwnerListener"})
 */
class Theme implements UserOwnedInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"theme:read", "website:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"theme:read", "theme:write", "website:read"})
     * @Assert\NotBlank
     * @Assert\Length(
     *      min = 2,
     *      max = 255
     * )
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"theme:read", "theme:write"})
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"theme:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"theme:read"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="themes")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"theme:read"})
     */
    private $owner;

    /**
     * @ORM\OneToMany(targetEntity=Website::class, mappedBy="theme", orphanRemoval=true)
     */
    private $websites;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"theme:read", "website:read"})
     */
    private $slug;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"theme:read", "theme:write"})
     */
    private $open = false;

    public function __construct()
    {
        $this->websites = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function setDescription(?string $description): self
    {
        $this->description = $description;

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

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection|Website[]
     */
    public function getWebsites(): Collection
    {
        return $this->websites;
    }

    /**
     * @Groups({"theme:read"})
     */
    public function getWebsitesCount(): int
    {
        return $this->getWebsites()->count();
    }

    public function addWebsite(Website $website): self
    {
        if (!$this->websites->contains($website)) {
            $this->websites[] = $website;
            $website->setTheme($this);
        }

        return $this;
    }

    public function removeWebsite(Website $website): self
    {
        if ($this->websites->removeElement($website)) {
            // set the owning side to null (unless already changed)
            if ($website->getTheme() === $this) {
                $website->setTheme(null);
            }
        }

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getOpen(): ?bool
    {
        return $this->open;
    }

    public function setOpen(?bool $open): self
    {
        $this->open = $open;

        return $this;
    }
}
